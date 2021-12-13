import react from 'react';

export default function Todoinput({onSubmit}){

    const [text, setText] = react.useState("");

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(text);
    }

    return (
        <div>
            <input type="text" placeholder="Enter Some thing..."
            value={text}
            onChange={handleChange}
            />
            <button onClick={handleSubmit}>Add</button>
        </div>
    )
}