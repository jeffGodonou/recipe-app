import React, {useEffect, useRef} from "react";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './TextEditor.scss';

const TextEditor = ({value, onChange}) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null); // event listener to store the Quill instance

    useEffect(() => {
        if(editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{list: 'orderdered'}, {list: 'bullet'}],
                        [{'script': 'sub'}, {'script': 'super'}],
                        [{'indent': '-1'}, {'indent': '+1'}],
                        [{'size': ['small', false, 'large', 'huge']}],
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    ]
                }
            });

            // define the action to be taken when the text is changed
            quillRef.current.on('text-change', () => {
                const html = quillRef.current.root.innerHTML;
                if (onChange && html !== value) {
                    onChange(html);
                }
            });

            // set the initial value
            if (value) {
                quillRef.current.root.innerHTML = value;
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value;
        }
    }, [value]);

    return <div ref={editorRef} />
};

export default TextEditor;