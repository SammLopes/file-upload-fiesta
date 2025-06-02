import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('Erro capturado:', error, info);
    }

    render() {
        if (this.state.hasError) {
            // Aqui você deve retornar JSX, não string
            return <h2>Algo deu errado. Tente novamente.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
