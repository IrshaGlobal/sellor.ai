// Localization system configuration for sellor.ai

// Localization Settings
class LocalizationSettings {
  static get() {
    return {
      defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
      supportedLanguages: (process.env.SUPPORTED_LANGUAGES || 'en,fr,es').split(','),
      fallbackLanguage: process.env.FALLBACK_LANGUAGE || 'en'
    };
  }
}

export { LocalizationSettings };

// Supported Locales
class SupportedLocales {
  static EN = 'en';
  static ES = 'es';
  static FR = 'fr';
  static DE = 'de';
}

// Localization Strings
class LocalizationStrings {
  static get(locale: string) {
    switch (locale) {
      case SupportedLocales.EN:
        return {
          welcome: 'Welcome',
          signIn: 'Sign In',
          signOut: 'Sign Out',
          register: 'Register',
          dashboard: 'Dashboard',
          products: 'Products',
          orders: 'Orders',
          settings: 'Settings',
          store: 'Store',
          cart: 'Cart',
          checkout: 'Checkout',
          orderConfirmation: 'Order Confirmation'
        };
      case SupportedLocales.ES:
        return {
          welcome: 'Bienvenido',
          signIn: 'Iniciar Sesión',
          signOut: 'Cerrar Sesión',
          register: 'Registrarse',
          dashboard: 'Tablero',
          products: 'Productos',
          orders: 'Pedidos',
          settings: 'Configuración',
          store: 'Tienda',
          cart: 'Carrito',
          checkout: 'Pagar',
          orderConfirmation: 'Confirmación de Pedido'
        };
      case SupportedLocales.FR:
        return {
          welcome: 'Bienvenue',
          signIn: 'Se Connecter',
          signOut: 'Déconnexion',
          register: 'S'inscrire',
          dashboard: 'Tableau de Bord',
          products: 'Produits',
          orders: 'Commandes',
          settings: 'Paramètres',
          store: 'Magasin',
          cart: 'Panier',
          checkout: 'Paiement',
          orderConfirmation: 'Confirmation de Commande'
        };
      case SupportedLocales.DE:
        return {
          welcome: 'Willkommen',
          signIn: 'Anmelden',
          signOut: 'Abmelden',
          register: 'Registrieren',
          dashboard: 'Dashboard',
          products: 'Produkte',
          orders: 'Bestellungen',
          settings: 'Einstellungen',
          store: 'Geschäft',
          cart: 'Warenkorb',
          checkout: 'Kasse',
          orderConfirmation: 'Bestätigungsseite'
        };
      default:
        throw new Error(`Unsupported locale: ${locale}`);
    }
  }
}

export { SupportedLocales, LocalizationStrings };