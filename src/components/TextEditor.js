import React, {useEffect, useRef} from "react";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './TextEditor.scss';

const TextEditor = () => {
    const editorRef = useRef(null);

    useEffect(() => {
        if(editorRef.current) {
            new Quill(editorRef.current, {
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
        }
    }, []);

    return <div ref={editorRef} />
};

export default TextEditor;