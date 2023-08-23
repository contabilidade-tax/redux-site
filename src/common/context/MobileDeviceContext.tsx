"use client"
import React, { createContext, useReducer, useContext, ReactNode, useLayoutEffect } from 'react';

const MobileContext = createContext<{ mobileState: { isSmallScreen: boolean; isMobileDevice: boolean; } } | undefined>(undefined);

function reducer(state: any, action: { type: string, value?: number }) {
    switch (action.type) {
        case 'CURRENT_CLIENT_SIZE':
            return {
                ...state,
                isSmallScreen: action.value
                    ? action.value >= 150 && action.value <= 1023
                    : false,
                isMobileDevice: action.value
                    ? action.value >= 150 && action.value <= 639
                    : false,
            }
        default:
            return state;
    }
}

export const useMobileContext = () => {
    const context = useContext(MobileContext);
    if (!context) {
        throw new Error('useMobileContext must be used within a MobileContextProvider');
    }
    return context;
};


export const MobileContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const initialState = { isSmallScreen: false, isMobileDevice: false };
    const [mobileState, dispatch] = useReducer(reducer, initialState);
    const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

    const handleCurrentSize = () => {
        dispatch({
            type: 'CURRENT_CLIENT_SIZE',
            value: currentWidth,
        })
    }

    // LayoutEffect para mudança no tamanho de tela
    useLayoutEffect(() => {
        // Listener do tamanho da tela
        handleCurrentSize()

        // Adiciona o EventListener
        window.addEventListener('resize', handleCurrentSize)

        // Remove o EventListener
        return () => {
            window.removeEventListener('resize', handleCurrentSize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWidth])

    return (
        <MobileContext.Provider value={{ mobileState }}>
            {children}
        </MobileContext.Provider>
    );
};
