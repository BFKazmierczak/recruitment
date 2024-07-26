declare module 'json-server' {
  interface RouterInstance {
    db: {
      _: {
        id: string
        // Add other properties of LowDB instance here if needed
      }
      [key: string]: any // Allow accessing any other property dynamically
    }
  }
}
