import React from 'react';

import './caption.scss'

interface CaptionProps {
    text: string;
    children?: React.ReactNode;
}

// export default Caption;
function Caption({ text }: CaptionProps) {
    return (
        <div className="modal">
            <article className="modal-container">
                <section className="modal-container-body rtf">
                    <p className='px-2'>{text}</p>
                </section>
            </article>
        </div>
    )
}

export default Caption