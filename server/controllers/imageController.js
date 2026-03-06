import userModel from "./../model/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    //  Get prompt from body
    const { prompt } = req.body;

    // Get userId from JWT middleware
    const userId = req.user.id;

    // Find user
    const user = await userModel.findById(userId);

    //Validation
    if (!user || !prompt || !prompt.trim()) {
      return res.json({
        success: false,
        message: "Missing detail",
      });
    }

    //  Check credit
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "No credit balance",
        creditBalance: user.creditBalance,
      });
    }

    // Prepare API request
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    // Convert image to base64
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    //  Deduct credit
    await userModel.findByIdAndUpdate(userId, {
      creditBalance: user.creditBalance - 1,
    });

    //  Success response
    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });

  } catch (error) {
    console.log("IMAGE GENERATION ERROR:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};