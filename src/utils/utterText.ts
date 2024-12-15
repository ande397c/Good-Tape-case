export const utterText = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text)
  speechSynthesis.speak(utterance)

  return { utterance, speechSynthesis }
}
