import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface MobileState {
    isSmallScreen: boolean;
    isMobileDevice: boolean;
}

type MobileAction = {
    type: 'CURRENT_CLIENT_SIZE';
    value?: number;
};

type MobileDispatch = (action: MobileAction) => void;

const MobileContext = createContext<{ state: MobileState; dispatch: MobileDispatch } | undefined>(undefined);


function reducer(state: any, action: { type: string, value?: number }) {
    switch (action.type) {
        case 'CURRENT_CLIENT_SIZE':
            return {
                ...state,
                isSmallScreen: action.value
                    ? action.value >= 150 && action.value <= 1024
                    : false,
                isMobileDevice: action.value
                    ? action.value >= 150 && action.value <= 640
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
    const initialState: MobileState = { isSmallScreen: false, isMobileDevice: false };
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MobileContext.Provider value={{ state, dispatch }}>
            {children}
        </MobileContext.Provider>
    );
};
