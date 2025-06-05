import { Tooltip } from "reactstrap";

const TooltipContainer = ({ 
    children, 
    target,
    isOpen,
    placement = "top" 
}: { 
    children: React.ReactNode, 
    target: string,
    isOpen: boolean,
    placement?: "top" | "bottom" | "left" | "right"
}) => {
    return (
        <Tooltip target={target} placement={placement} isOpen={isOpen}>
            {children}
        </Tooltip>
    );
};

export default TooltipContainer;