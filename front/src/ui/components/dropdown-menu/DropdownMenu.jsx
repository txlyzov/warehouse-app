import "./DropdownMenu.scss"
import React, { useState } from 'react';
import DROPDOWN_MENU from "./DropdownMenu.dictionary";


function DropdownMenu({ className, triggerContent, dropdownContent, width = "auto", position = {
    top: "auto",
    left: "auto",
} }) {

    const [dropdownVisability, setDropdownVisability] = useState(false);

    return (
        <div className={`dropdown-menu wrapper ${className}`}>
            {triggerContent ?
                <div
                    aria-hidden="true"
                    className="dropdown-menu__trigger"
                    onClick={() => {
                        setDropdownVisability(!dropdownVisability);
                    }}
                >
                    {triggerContent}
                </div>
                :
                null
            }

            {dropdownVisability ?
                <div
                    data-testid={DROPDOWN_MENU.TEST_ID.DROPDOWN_CONTENT}
                    aria-hidden="true"
                    onClick={() => setDropdownVisability(!dropdownVisability)}
                    className="dropdown-menu__content"
                    style={{ width, top: position.top, left: position.left }}
                >
                    {dropdownContent}
                </div> : null}
        </div>
    );
}

export default DropdownMenu;
