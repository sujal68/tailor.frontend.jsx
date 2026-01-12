import React from 'react';
import { Eye, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const Table = () => {

  const customers = [
    { id: 1, name: 'Arjun Singh', phone: '+91 836-3578', gender: 'Female', lastVisit: '2023-08-10', measurements: 'available', mCount: 2, orders: 20, business: 'Royal Tailors', status: 'active', img: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Maie Barnan', phone: '+91 838-5440', gender: 'Male', lastVisit: '2023-11-29', measurements: 'missing', orders: 23, business: 'Elite Stitch', status: 'active', img: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Jaana Haena', phone: '+91 889-0500', gender: 'Female', lastVisit: '2023-10-19', measurements: 'outdated', orders: 14, business: 'Urban Fit', status: 'blocked', img: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Arjun Singh', phone: '+91 836-3578', gender: 'Male', lastVisit: '2024-04-23', measurements: 'available', mCount: 2, orders: 15, business: 'Royal Tailors', status: 'active', img: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'Karak Arien', phone: '+91 838-3430', gender: 'Male', lastVisit: '2023-10-21', measurements: 'available', mCount: 2, orders: 20, business: 'Prime Cut', status: 'active', img: 'https://i.pravatar.cc/150?u=5' },
    { id: 6, name: 'Nevic Heirman', phone: '+91 333-7575', gender: 'Male', lastVisit: '2023-10-19', measurements: 'outdated', orders: 8, business: 'Elite Stitch', status: 'active', img: 'https://i.pravatar.cc/150?u=6' },
    { id: 7, name: 'Sara Kim', phone: '+91 853-0070', gender: 'Female', lastVisit: '2023-06-23', measurements: 'missing', orders: 20, business: 'Urban Fit', status: 'blocked', img: 'https://i.pravatar.cc/150?u=7' },
    { id: 8, name: 'Daniel Roy', phone: '+91 855-3058', gender: 'Male', lastVisit: '2024-06-23', measurements: 'available', mCount: 2, orders: 3, business: 'Prime Cut', status: 'active', img: 'https://i.pravatar.cc/150?u=8' },
  ];

  const lastViewed = Array.from({ length: 8 }, () => ({
    name: 'Arjun Singh',
    time: 'Today, 10:30 AM',
    img: 'https://i.pravatar.cc/150?u=9'
  }));
  const stripRef = React.useRef(null);

  React.useEffect(() => {
    const el = stripRef.current;
    let isDown = false;
    let startX = 0;
    let velocity = 0;
    let lastX = 0;
    let rafId;

    const onDown = (e) => {
      isDown = true;
      startX = e.pageX;
      lastX = e.pageX;
      el.style.cursor = 'grabbing';
    };

    const onUp = () => {
      isDown = false;
      el.style.cursor = 'grab';
      momentum();
    };

    const onMove = (e) => {
      if (!isDown) return;
      const x = e.pageX;
      const delta = x - lastX;
      velocity = delta;
      el.scrollLeft -= delta;
      lastX = x;
    };

    const momentum = () => {
      velocity *= 0.95;
      el.scrollLeft -= velocity;
      if (Math.abs(velocity) > 0.5) {
        rafId = requestAnimationFrame(momentum);
      }
    };

    el.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);

    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);


  return (
    <div className="tms-dashboard">
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

:root {
  --bg: #f5f1ea8b;
--card: linear-gradient(
  180deg,
  #ffffff9a 0%,
  #ffffff4f 100%
);
  --border: #e3dbd0;
  --text: #4e463e;
  --muted: #8f8579;
  --accent: #b79d74;
  --white: #ffffff;
}

.tms-dashboard {
  font-family: 'Inter', sans-serif;
  color: var(--text);
}

.main-container {
  max-width: 1084px;
  margin: 0 auto;
  background: var(--card);
  border-radius: 18px;
  padding: 26px;
  border: 1px solid white;
  transition: max-width 0.35s ease;
}

/* When sidebar collapses */
body.sidebar-collapsed .main-container {
  max-width: 1272px;
}

/* Table */

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--muted);
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
}

tbody tr {
  background: transparent;
  transition: background 0.15s ease;
}

tbody tr:hover {
  background: rgba(255,255,255,0.55);
}

td {
  padding: 12px 14px;
  font-size: 0.85rem;
  border-bottom: 1px solid var(--border);
}

/* Customer */

.customer-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
}

/* Badges */

.badge {
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 500;
}

.badge-available { background: #e9f4ee; color: #3f7f5a; border: 1px dashed;}
.badge-missing { background: #fff2db; color: #b88924; border: 1px dashed; }
.badge-outdated { background: #f2ede8; color: #7a5c4d; border: 1px dashed; }

/* Status */

.status-pill {
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-pill.active {
  background: #e7f3ed;
  color: #2f6f53;
  border: 1px dashed;
}

.status-pill.blocked {
  background: #fdeaea;
  color: #a64444;
  border: 1px dashed;
}

/* Actions */

.actions-cell {
  display: flex;
  gap: 10px;
  color: var(--accent);
  opacity: 0.6;
}

tbody tr:hover .actions-cell {
  opacity: 1;
}

/* Activity */

.activity-section {
  margin-top: 22px;
}

.activity-title {
  font-size: 0.8rem;
  color: var(--muted);
  margin-bottom: 10px;
}

.activity-strip {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  cursor: grab;
  user-select: none;
}

.activity-strip::-webkit-scrollbar { display: none; }

.mini-card {
    min-width: 150px;
    padding: 8px;
    border-radius: 10px;
    background: #ffffff42;
    display: flex;
    gap: 8px;
    align-items: center;
    border: 1px solid #dcd2c3;
}

.mini-name { font-size: 0.75rem; font-weight: 600; }
.mini-time { font-size: 0.68rem; color: var(--muted); }

/* Pagination */

.pagination {
  margin-top: 18px;
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 0.8rem;
  color: var(--muted);
}

.page-num {
  padding: 4px 8px;
  cursor: pointer;
}

.page-num.active {
  background: #ebe4da;
  border-radius: 6px;
  color: var(--text);
  font-weight: 600;
}

/* Mobile */

@media (max-width: 768px) {
  th:nth-child(3),
  td:nth-child(3) {
    display: none;
  }
}

      `}</style>

      <div className="main-container">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Last Visit</th>
              <th>Measurements</th>
              <th>Orders</th>
              <th>Business</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="customer-row">
                <td>
                  <div className="customer-info">
                    <img src={c.img} className="avatar" alt="" /> {c.name}
                  </div>
                </td>
                <td>{c.phone}</td>
                <td>{c.gender}</td>
                <td>{new Date(c.lastVisit).toLocaleDateString()}</td>
                <td>
                  {c.measurements === 'available' && <span className="badge badge-available">Available · {c.mCount}</span>}
                  {c.measurements === 'missing' && <span className="badge badge-missing">Missing</span>}
                  {c.measurements === 'outdated' && <span className="badge badge-outdated">Outdated</span>}
                </td>
                <td>{c.orders}</td>
                <td>{c.business}</td>
                <td><span className={`status-pill ${c.status}`}>{c.status}</span></td>
                <td>
                  <div className="actions-cell">
                    <Eye size={16} />
                    <Edit2 size={14} />
                    <Trash2 size={14} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="activity-section">
          <div className="activity-title">Last 10 Viewed Customers</div>
          <div className="activity-strip" ref={stripRef}>
            {lastViewed.map((item, i) => (
              <div className="mini-card" key={i}>
                <img src={item.img} className="avatar" alt="" />
                <div>
                  <div className="mini-name">{item.name}</div>
                  <div className="mini-time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pagination">
          <ChevronLeft size={16} />
          <span className="page-num active">1</span>
          <span className="page-num">2</span>
          <span className="page-num">3</span>
          <span>...</span>
          <span className="page-num">10</span>
          <ChevronRight size={16} />
        </div>

      </div>
    </div>
  );
};

export default Table;