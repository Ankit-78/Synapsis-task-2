import { useEffect, useState } from 'react';
import API from '../services/api';
import { getAuthHeader } from '../services/auth';
import '../styles/Dashboard.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notesBg = 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1740&q=80';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const profiles = [
    {
      id: 1,
      name: 'Emma Watson',
      email: 'emma@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    },
  ];

  const fetchFiles = async () => {
    try {
      const res = await API.get('/docs', getAuthHeader());
      setFiles(res.data);
    } catch (error) {
      console.error('Fetch File error:', error);

      toast.error('❌ Failed to fetch documents');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.warn('⚠️ Please select a file before uploading');
    const formData = new FormData();
    formData.append('file', file);
    try {
      await API.post('/docs', formData, getAuthHeader());
      toast.success('📤 File uploaded successfully');
      setFile(null);
      fetchFiles();
    } catch (error) {
      console.error('Upload File Error:', error);
      toast.error('❌ Upload failed');
    }
  };

  const deleteFile = async (id) => {
    try {
      await API.delete(`/docs/${id}`, getAuthHeader());
      toast.info('🗑️ File deleted');
      fetchFiles();
    } catch (error) {
      console.error('Delete File error:', error);
      toast.error('❌ Delete failed');
    }
  };

  const updateFile = async (id, updatedFile) => {
    if (!updatedFile) return toast.warn('⚠️ No file selected for update');
    const formData = new FormData();
    formData.append('file', updatedFile);
    try {
      await API.put(`/docs/${id}`, formData, getAuthHeader());
      toast.success('♻️ File updated');
      fetchFiles();
    } catch (error) {
      console.error('Update File error:', error);
      toast.error('❌ Update failed');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className='dashboard' style={{ backgroundImage: `url(${notesBg})` }}>
      <div className='overlay'>
        <ToastContainer position='top-right' autoClose={2000} theme='colored' />

        <h2 className='dashboard-title'>👥 User Profiles & 📁 Documents</h2>

        <div className='profiles-container'>
          {profiles.map((user, index) => (
            <div key={index} className='profile-card'>
              <img src={user.avatar} alt={user.name} className='profile-avatar' />
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <form onSubmit={handleUpload} className='upload-form-profile'>
                <input
                  type='file'
                  onChange={e => setFile(e.target.files[0])}
                  required
                />
                <button type='submit' className='upload-btn'>Upload</button>
              </form>
            </div>
          ))}
        </div>

        <h3 className='dashboard-subtitle'>📂 Document Library</h3>
        <div className='files-list'>
          {files.map(doc => (
            <div key={doc._id} className='file-card'>
              <p><strong>Filename:</strong> {doc.originalName}</p>
              <p><strong>Type:</strong> {doc.mimetype}</p>
              <div className='file-buttons'>
                <a
                  className='btn view-btn'
                  href={`http://localhost:5000/uploads/${doc.filename}`}
                  target='_blank'
                  rel='noreferrer'
                >View</a>

                <label className='btn update-btn'>
                  Update
                  <input
                    type='file'
                    style={{ display: 'none' }}
                    onChange={e => updateFile(doc._id, e.target.files[0])}
                  />
                </label>

                <button className='btn delete-btn' onClick={() => deleteFile(doc._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 

