import * as React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import sv from '@ckeditor/ckeditor5-build-classic/build/translations/sv.js';
import html2pdf from 'html2pdf.js';

export default function App() {
  const [content, setContent] = React.useState('');

  const exportToPDF = () => {
    const options = {
      filename: 'content.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(options).from(content).save();
  };

  return (
    <div className='App'>
      <CKEditor
        editor={ClassicEditor}
        config={{
          language: 'sv',
          translation: sv,
        }}
        data={content}
        onReady={(editor) => {
          console.log('CKEditor React Component is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          setContent(editor.getData());
        }}
      />
      <button onClick={exportToPDF}>Exportera pdf</button>
    </div>
  );
}
