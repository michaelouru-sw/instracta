// Mock Base44 client for local development
// This allows the app to run without requiring API keys or backend services

export const base44 = {
  integrations: {
    Core: {
      SendEmail: async (data) => {
        console.log('📧 Mock Email Send:', data)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        return { success: true, message: 'Email sent (mock)' }
      }
    }
  },
  analytics: {
    track: (data) => {
      console.log('📊 Mock Analytics Track:', data)
      return { success: true }
    }
  }
}

export default base44
