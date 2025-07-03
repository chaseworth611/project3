import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const initialTodos = [
  { text: "Schedule orthopedic appointment", timeframe: "Week 1", completed: false },
  { text: "Start RICE (Rest, Ice, Compression, Elevation)", timeframe: "Week 1", completed: false },
  { text: "Get MRI scan", timeframe: "Week 1-2", completed: false },
  { text: "Consult with surgeon", timeframe: "Week 2", completed: false },
  { text: "Arrange for surgery (if needed)", timeframe: "Week 2-3", completed: false },
  { text: "Prepare home for post-surgery recovery", timeframe: "Week 2-3", completed: false },
  { text: "Begin physical therapy (prehab)", timeframe: "Week 2-4", completed: false },
  { text: "Undergo ACL surgery", timeframe: "As scheduled", completed: false },
  { text: "Start post-op physical therapy", timeframe: "Week 1 post-op", completed: false },
  { text: "Gradually increase mobility", timeframe: "Weeks 2-6 post-op", completed: false },
  { text: "Return to light activities", timeframe: "Months 3-6 post-op", completed: false },
  { text: "Full return to sports", timeframe: "6-12 months post-op", completed: false },
];

function App() {
  const [activeTab, setActiveTab] = useState("todo");
  const [todos, setTodos] = useState(initialTodos);
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const toggleTodo = (idx) => {
    setTodos(
      todos.map((todo, i) =>
        i === idx ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the form data to a backend
  };

  return (
    <div className="App surgical-bg p-4 rounded shadow">
      <h1 className="mb-4 text-primary">ACL Recovery Portal</h1>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "todo" ? "active" : ""}`}
            onClick={() => setActiveTab("todo")}
          >
            To-Do List
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => setActiveTab("contact")}
          >
            Contact
          </button>
        </li>
      </ul>

      <div>
        {activeTab === "todo" && (
          <div>
            <ul className="list-group mb-4">
              {todos.map((todo, idx) => (
                <li
                  key={idx}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    todo.completed ? "list-group-item-success" : ""
                  }`}
                  style={{
                    background: todo.completed ? "#e6fff2" : "white",
                    border: "1px solid #d1e7dd",
                  }}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(idx)}
                      className="form-check-input me-2"
                    />
                    <span
                      style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        color: todo.completed ? "#6c757d" : "#222",
                      }}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <span className="badge bg-info text-dark">{todo.timeframe}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "contact" && (
          <div>
            <h2 className="mb-3 text-secondary">Contact Your Care Team</h2>
            {submitted ? (
              <div className="alert alert-success">Thank you for reaching out! We will contact you soon.</div>
            ) : (
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={contact.name}
                  onChange={handleContactChange}
                  required
                  className="form-control mb-2"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={contact.email}
                  onChange={handleContactChange}
                  required
                  className="form-control mb-2"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={contact.message}
                  onChange={handleContactChange}
                  required
                  className="form-control mb-2"
                />
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
