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

    if(user.credits<50){
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

    if (!parsed.code) {
      console.log("AI return Invvalid respnse", raw);
      return res.status(400).json({ message: "ai returned invalid response" });
    }

    //save the website data in database

    const website = await Website.create({
      user: user._id,
      title: prompt.slice(0, 60),
      latestCode: parsed.code,
      conversation: [{ role: "ai", content: parsed.message },{ role: "user", content: prompt }],
      slug: `${parsed.name.toLowerCase().replace(/\s+/g, "-")}-${nanoid(6)}`,
    });

    user.credits=user.credits-50
    await user.save()

    return res.status(201).json({
        websiteId:website._id,
        remainingCredits:user.credits,
    })

  } catch (error) {
    return res.status(500).json({ message:`generate website error ${error}` });
  }
};

const getWebsiteById=async (req,res) => {
  try {
    const website=await Website.findOne({
      _id:req.params.id,
      user:req.user._id
    })

    if(!website){
      return res.status(400).json({
        message:"Website is not find"
      })
    }
    return res.status(201).json({mrssage






      
    })
  } catch (error) {
    
  }
}

export { generateWebsite };
