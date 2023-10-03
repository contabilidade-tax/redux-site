import React from 'react';

import './caption.scss'

interface CaptionProps {
    text: string;
    children?: React.ReactNode;
}

// const Caption: React.FC<CaptionProps> = ({ text }) => {
//     return (
//         <div>
//             <p className='text-sm'>{text}</p>
//         </div>
//     );
// };

// export default Caption;
function Caption({ text, children }: CaptionProps) {
    return (
        <div className="modal">
            <article className="modal-container">
                {/* {children} */}
                <section className="modal-container-body rtf">
                    <p>{text}</p>
                </section>
            </article>
        </div>
    )
}

export default Caption