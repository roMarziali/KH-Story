export interface TextFormIdentifier {
  chapterId: number,
  previousTitle?: number,
  previousParagraph?: number,
  relatedTitle?: number,
  relatedParagraph?: number,
  action?: 'editing' | 'adding',
  type?: 'title' | 'paragraph'
}

