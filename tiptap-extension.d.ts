// tiptap-extensions.d.ts
import 'tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textAlign: {
      /**
       * Set the text alignment
       */
      setTextAlign: (
        alignment: 'left' | 'right' | 'center' | 'justify'
      ) => ReturnType
    }
  }
}
