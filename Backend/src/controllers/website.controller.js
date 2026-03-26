import { generateResponse } from "../config/openRouter.js";
import User from "../models/user.model.js";
import Website from "../models/website.model.js";
import { masterPrompt } from "../prompts/prompt.js";
import extractJson from "../utils/extractJson.js";
import { nanoid } from "nanoid";

const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        message: "prompt is required",
      });
    }
    const user = await User.findById(req.user._id); //if user is authenticated

    if (!user) {
      return res.status(400).json({
        message: "user is login",
      });
    }

    if (user.credits < 50) {
      return res.status(400).json({
        message: "User have not enough credits to generate a website",
      });
    }
    //generate the website code using open router
    const finalPrompt = masterPrompt.replace("USER_PROMPT", prompt);
    let raw = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(finalPrompt);
      parsed = await extractJson(raw);

      //    if parsed data is null then you again run the genrate response
      if (!parsed) {
        raw = await generateResponse(finalPrompt + "\n\nRETURN ONLY RAW JSON");
        parsed = await extractJson(raw);
      }
    }

    if (!parsed || !parsed.code) {
      console.log("AI return Invvalid respnse", raw);
      return res.status(400).json({ message: "ai returned invalid response" });
    }

    //save the website data in database

    const website = await Website.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestCode: parsed.code,
      conversation: [
        { role: "user", content: prompt },
        { role: "ai", content: parsed.message },
      ],
      slug:
        (parsed?.title || "website").toLowerCase().replace(/\s+/g, "-") +
        "-" +
        nanoid(6),
    });

    user.credits = user.credits - 50;
    await user.save();

    return res.status(201).json({
      websiteId: website._id,
      remainingCredits: user.credits,
    });
  } catch (error) {
    console.error("generateWebsite error", error);
    return res.status(500).json({ message: `generate website error ${error}` });
  }
};

const getWebsiteById = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!website) {
      return res.status(400).json({
        message: "Website not found",
      });
    }
    return res.status(201).json(website);
  } catch (error) {
    return res.status(500).json({ message: `Generate website error ${error}` });
  }
};

const updateWebsiteConversation = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        message: "prompt is required",
      });
    }

    const user = await User.findById(req.user._id); //if user is authenticated

    if (!user) {
      return res.status(400).json({
        message: "user is not login",
      });
    }

    if (user.credits < 25) {
      return res.status(400).json({
        message: "User have not enough credits to generate a website",
      });
    }
    //find the website by id and user id
    const websiteID = req.params.id;
    const website = await Website.findOne({
      _id: websiteID,
      user: req.user._id,
    });
    if (!website) {
      return res.status(400).json({
        message: "Website not found",
      });
    }

    const updatePrompt = `
    UPADTE THIS HTML WEBSITE

    

    CURRENT_CODE:
    ${website.latestCode}
    USER_REQUEST:
    ${prompt}

    RETURN RAW JSON ONLY:
    {
    "message":"Short Confirmation",
    "code":"<UPDATED FULL HTML >"
    }
    `;

    let raw = "";
    let parsed = null;
    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await generateResponse(updatePrompt);
      parsed = await extractJson(raw);

      //    if parsed data is null then you again run the genrate response
      if (!parsed) {
        raw = await generateResponse(updatePrompt + "\n\nRETURN ONLY RAW JSON");
        parsed = await extractJson(raw);
      }
    }

    if (!parsed.code) {
      console.log("AI return Invvalid respnse", raw);
      return res.status(400).json({ message: "ai returned invalid response" });
    }

    website.conversation.push(
      { role: "user", content: prompt },
      { role: "ai", content: parsed.message },
    );
    //update the latest code
    website.latestCode = parsed.code;
    await website.save();

    //update user credits
    user.credits = user.credits - 25;
    await user.save();

    return res.status(200).json({
      message: parsed.message,
      code: parsed.code,
      remainingCredits: user.credits,
    });
  } catch (error) {
    return res.status(500).json({ message: `Update website error ${error}` });
  }
};

const getAllWebsites = async (req, res) => {
  try {
    const websites = await Website.find({ user: req.user._id });
    if (!websites) {
      return res.status(400).json({
        message: "No website found for this user",
      });
    }

    return res.status(200).json(websites);
  } catch (error) {
    return res.status(500).json({ message: `Get all websites error ${error}` });
  }
};

const deployWebsite = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!website) {
      return res.status(400).json({
        message: "Website not found",
      });
    }
    website.deployed = true;
    website.deployUrl=`${process.env.FRONTEND_URL}/site/${website.slug}`
   await website.save();
    return res.status(200).json({
      url: website.deployUrl,
    });
  } catch (error) {
    return res.status(500).json({ message: `Deploy website error ${error}` });
  }

}

const findWebsiteBySlug = async (req, res) => {
  try {
    const website = await Website.findOne({ slug: req.params.slug, user: req.user._id  });
    if (!website) {
      return res.status(400).json({ message: "Website not found" });
    } 
    return res.status(200).json(website);
  } catch (error) {
    return res.status(500).json({ message: `Find website by slug error ${error}` });
  }
};


export {
  generateWebsite,
  getWebsiteById,
  updateWebsiteConversation,
  getAllWebsites,
  deployWebsite,
  findWebsiteBySlug
};
