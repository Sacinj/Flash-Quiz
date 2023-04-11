import { useEffect } from "react";

const ModalWarning = ({modalContent}) => {
    return(
        <div className="ModalWarning">
            <p style={{fontSize: '1rem', color: 'pink'}}>{modalContent}</p>
        </div>
    );
};
export default ModalWarning;