import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Crud = () => {
  const [form, setForm] = useState({

    name: '',
    email: '',
    message: ''
  })

  const [data, setData] = useState([])
  const [editId, setEditId] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (editId) {
      await axios.put(`http://localhost:5000/api/users/${editId}`, form)

      setEditId(null)
    } else {
      await axios.post("http://localhost:5000/api/users", form)
    }

    setForm({ name: '', email: '', message: '' })
    fetchData()
  }

  const fetchData = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/users");
    setData(res.data);  
  } catch (error) {
    console.log("Fetch error:", error);
  }
};


  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchData();
  }

  const handleEdit = (item) => {
  setForm({
    name: item.name,
    email: item.email,
    message: item.message
  });
  setEditId(item._id);
};

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Simple CRUD App
      </h2>

      <form onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg mb-8">

        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter message"
            required
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editId ? "Update" : "Submit"}
        </button>

      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.message}</td>
                <td className="p-3 flex gap-3 justify-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 p-4 italic"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Crud;
