export const goodTapeService = async (audioBlob: Blob) => {
 const GOOD_TAPE_API_URL = "https://api.goodtape.io/transcribe/sync"; // Synchronous endpoint
 const GOOD_TAPE_API_KEY = import.meta.env.VITE_GOOD_TAPE_API_KEY;

 // Convert the audioBlob into a File (optional but useful for naming)
 const audioFile = new File([audioBlob], "recording.webm", { type: "audio/webm" });

 // Create the FormData instance
 const formData = new FormData();
 formData.append("audio", audioFile); // Required
 formData.append("withTimeStamps", "false"); // Optional: Include time stamps

 try {
  // Make the POST request to upload the audio for synchronous transcription
  const response = await fetch(GOOD_TAPE_API_URL, {
   method: "POST",
   mode: "no-cors",
   headers: {
    Authorization: GOOD_TAPE_API_KEY, // Include the API key for authentication
   },
   body: formData, // Pass the form data with the file and additional fields
  });

  if (!response.ok) {
   const errorDetails = await response.json().catch(() => ({}));
   throw new Error(`Transcription failed: ${response.status} - ${response.statusText} - ${JSON.stringify(errorDetails)}`);
  }

  const data = await response.json();
  console.log("Transcription result:", data);
  return data; // Return the transcription results
 } catch (err) {
  console.error("Error during transcription:", err);
  throw err; // Propagate error for the caller to handle
 }
};
