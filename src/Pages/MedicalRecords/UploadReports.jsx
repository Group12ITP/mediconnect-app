import { useState, useRef } from 'react';

const UploadReports = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'Blood_Test_Report.pdf', type: 'PDF', size: '1.2 MB', date: '12 Mar 2026', status: 'uploaded' },
    { id: 2, name: 'Chest_XRay.jpg', type: 'JPG', size: '3.4 MB', date: '11 Mar 2026', status: 'uploaded' },
    { id: 3, name: 'Lipid_Profile.xlsx', type: 'XLS', size: '856 KB', date: '10 Mar 2026', status: 'uploaded' },
    { id: 4, name: 'ECG_Report.pdf', type: 'PDF', size: '2.1 MB', date: '09 Mar 2026', status: 'uploaded' },
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.name.split('.').pop().toUpperCase(),
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      date: 'Just now',
      status: 'uploading',
    }));

    setFiles((prev) => [...newFiles, ...prev]);

    // Simulate upload complete
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.status === 'uploading' ? { ...f, status: 'uploaded', date: 'Just now' } : f
        )
      );
    }, 1500);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const getFileIcon = (type) => {
    const icons = { PDF: '📕', JPG: '🖼️', PNG: '🖼️', XLS: '📊', DOC: '📄' };
    return icons[type] || '📄';
  };

  return (
    <div className="h-full bg-white rounded-3xl shadow-inner p-8 overflow-auto">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900">Upload Medical Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Drag & Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all ${
            isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center text-5xl mb-6">
            ⬆️
          </div>
          <h3 className="text-2xl font-medium text-gray-800">Drag and Drop file</h3>
          <p className="text-gray-500 mt-2 mb-6">or</p>
          
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-3xl font-medium transition-colors"
          >
            Browse Files
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.png,.jpeg,.doc,.docx,.xls,.xlsx"
            className="hidden"
            onChange={handleFileSelect}
          />

          <p className="text-xs text-gray-400 mt-8">
            Supported formats: PDF, JPG, PNG, DOC, XLS
          </p>
        </div>

        {/* RIGHT: Uploaded Files List */}
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
          <h4 className="font-semibold text-gray-700 mb-4">Uploaded Reports ({files.length})</h4>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-x-4 bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-sm transition-all"
              >
                <div className="text-4xl">{getFileIcon(file.type)}</div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {file.size} • {file.date}
                  </p>
                </div>

                {file.status === 'uploaded' ? (
                  <div className="text-emerald-500 text-2xl">✅</div>
                ) : (
                  <div className="text-emerald-500 animate-pulse">↑</div>
                )}

                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500 text-2xl transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {files.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No reports uploaded yet
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-10 flex justify-end gap-x-4">
        <button className="px-8 py-3 text-gray-600 font-medium border border-gray-300 rounded-3xl hover:bg-gray-100">
          Cancel
        </button>
        <button className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-3xl hover:bg-emerald-700">
          Save to Medical Record
        </button>
      </div>
    </div>
  );
};

export default UploadReports;