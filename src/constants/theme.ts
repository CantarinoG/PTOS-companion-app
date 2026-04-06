export const Colors = {
    primary: '#000000',
    secondary: '#5F5F5F',
    tertiary: '#757575',
    background: '#F9F9F9',
    surface: '#FFFFFF',
    text: '#000000',
    subtext: '#5F5F5F',

    deficit: '#D32F2F',
    surplus: '#2E7D32',
};

export const Typography = {
    display: {
        fontSize: 64,
        fontFamily: 'PlusJakartaSans_800ExtraBold',
        lineHeight: 72,
        letterSpacing: -2,
    },
    h1: {
        fontSize: 40,
        fontFamily: 'PlusJakartaSans_800ExtraBold',
        lineHeight: 50,
        letterSpacing: -1.5,
    },
    h2: {
        fontSize: 24,
        fontFamily: 'PlusJakartaSans_700Bold',
        lineHeight: 32,
        letterSpacing: -1.5,
    },
    body: {
        fontSize: 16,
        fontFamily: 'PlusJakartaSans_400Regular',
        lineHeight: 24,
    },
    boldBody: {
        fontSize: 20,
        fontFamily: 'PlusJakartaSans_700Bold',
        lineHeight: 24,
    },
    label: {
        fontSize: 16,
        fontFamily: 'PlusJakartaSans_600SemiBold',
        lineHeight: 20,
        letterSpacing: 1.5,
    },
    overline: {
        fontSize: 12,
        fontFamily: 'PlusJakartaSans_600SemiBold',
        lineHeight: 14,
        letterSpacing: 2,
        textTransform: 'uppercase' as const,
        color: Colors.secondary,
    },
    caption: {
        fontSize: 12,
        fontFamily: 'PlusJakartaSans_400Regular',
        lineHeight: 16,
    },
    appBarTitle: {
        fontSize: 24,
        fontFamily: 'PlusJakartaSans_800ExtraBold',
        lineHeight: 24,
        letterSpacing: -1.5,
    },
};