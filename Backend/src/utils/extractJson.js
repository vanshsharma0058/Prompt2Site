const extractJson = (text) => {
  if (!text) {
    throw new Error("Empty response");
  }

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No JSON found in response");
  }

  const jsonString = cleaned.slice(start, end + 1);

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Invalid JSON:", jsonString);
    throw new Error("Invalid JSON format");
  }
};

export default extractJson;