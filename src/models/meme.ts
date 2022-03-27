export const MEME_COLORS = ["#000000", "#EA414B", "#F19F37", "#FDFB53", "#68E144", "#73F7EC", "#367DF6", "#6639F6", "#EB54B1", "#FFFFFF"] as const
export const MEME_FONTS = ["Anton", "Inter", "Josefin Sans", "Merriweather", "Pacifico"] as const
export const MEME_ALIGNS = ["left", "center", "right"] as const
export const MEME_POSITIONS = ["flex-start", "center", "flex-end"] as const
export const MEME_BADGES = ["veteran", "used", "cited", "like", "daily", "new"] as const

export type MemeColor = (typeof MEME_COLORS)[number]
export type MemeFont = (typeof MEME_FONTS)[number]
export type MemeSize = number
export type MemeAlign = (typeof MEME_ALIGNS)[number]
export type MemePosition = (typeof MEME_POSITIONS)[number]
export type MemeBadge = (typeof MEME_BADGES)[number]

export type Meme = {
  image: string,
  text: string,
  color: MemeColor,
  font: MemeFont,
  size: MemeSize,
  align: MemeAlign,
  position: MemePosition,
  badges: MemeBadge[],
  authorName?: string
}