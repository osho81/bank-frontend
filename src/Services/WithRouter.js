import { useNavigate } from 'react-router-dom';

// For usage in class components (functional components can handle hooks directly)
export const WithRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();

        return (
            <Component
                navigate={navigate}
                {...props}
            />
        );
    };

    return Wrapper;
};