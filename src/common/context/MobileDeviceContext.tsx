"use client"
import React, { createContext, useReducer, useContext, ReactNode, useLayoutEffect } from 'react';

interface MobileContextProps {
    mobileState: {
        isSmallScreen: boolean;
        isMobileDevice: boolean;
        homePageindex: number;
    }
    handleHomePageIndex: (index: number) => void;
}

const MobileContext = createContext<MobileContextProps | undefined>(undefined);

function reducer(state: any, action: { type: string, value?: number }) {
    switch (action.type) {
        case 'CURRENT_CLIENT_SIZE':
            return {
                ...state,
                isMobileDevice: action.value
                    ? action.value >= 150 && action.value <= 1024
                    : false,
                isSmallScreen: action.value
                    ? action.value >= 150 && action.value <= 639
                    : false,
            }
        case 'HOME_PAGE_INDEX':
            return {
                ...state,
                homePageindex: action.value,
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
    const initialState = { isSmallScreen: false, isMobileDevice: false, homePageindex: 0 };
    const [mobileState, dispatch] = useReducer(reducer, initialState);
    const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

    const handleCurrentSize = () => {
        dispatch({
            type: 'CURRENT_CLIENT_SIZE',
            value: currentWidth,
        })
    }

    const handleHomePageIndex = (index: number) => {
        dispatch({
            type: 'HOME_PAGE_INDEX',
            value: index,
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
        <MobileContext.Provider value={{ mobileState, handleHomePageIndex }}>
            {children}
        </MobileContext.Provider>
    );
};
