import Button from '../button/Button';
import Icon from '../icon/Icon';
import './Input.scss';

function Input({ issue, width, closable, className, size, heigth, setInputValue, inputValue, ...props }) {
    const resetInput = () => {
        setInputValue('')
    }

    return (
        <div className={`input-block ${className}`}>
            <input
                // style={{ width }}
                value={inputValue} {...props}
                onChange={e => setInputValue(e.target.value)}
                className={`input-block__input input-${size ? size : 'bs'} 
                input-heigth-${heigth ? heigth : 1} ${issue ? 'negative' : ''}`} />
            {closable ?
                <Button
                    click={() => resetInput()}
                    className={`input-block__reset-button reset-button-${size ? size : 'bs'}`}
                    text={<Icon
                        name="close"
                        size="22px"
                        className={`input-block__close-icon close-icon-${size ? size : 'bs'}`} />}
                    type="secondary"
                    size="ssm">
                </Button>
                :
                ''}
        </div>
    );
}

export default Input;