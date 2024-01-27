export interface TextFormMetadata {
  chapterId: number,
  previousSectionId?: number,
  previousParagraphId?: number,
  relatedSectionId?: number,
  relatedParagraphId?: number,
  action?: 'editing' | 'adding',
  type?: 'title' | 'paragraph'
}

