export async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator === 'undefined') return false;
    const clip = (navigator as Navigator & { clipboard?: Clipboard }).clipboard;
    if (!clip?.writeText) return false;
    await clip.writeText(text);
    return true;
  } catch {
    return false;
  }
}
