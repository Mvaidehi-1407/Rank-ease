import { useState } from 'react';
import {
  User,
  Mail,
  GraduationCap,
  BarChart3,
  Award,
  Edit3,
  Camera,
  MapPin,
  Phone,
  School
} from 'lucide-react';

export default function Profile() {
  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    name: 'Vaidehi',
    email: 'vaidehi@email.com',
    phone: '+91 9876543210',
    college: 'JNTUH',
    year: '2nd Year',
    rank: 5000,
    branch: 'CSE',
    category: 'OC',
    region: 'OU',
    location: 'Hyderabad',
    bio: 'AI & ML Enthusiast passionate about smart education systems.'
  });

  // PROFILE IMAGE
  const [profileImage, setProfileImage] = useState(null);

  // DEFAULT AI AVATAR
  const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;

  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My AI Profile</h1>

          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <Edit3 className="w-4 h-4" />
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* PROFILE CARD */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-8">

          {/* PROFILE IMAGE */}
          <div className="relative w-32 h-32 shrink-0">

            <img
              src={profileImage || defaultAvatar}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white/10 shadow-xl object-cover"
            />

            <label className="absolute bottom-0 right-0 bg-black/60 p-2 rounded-full cursor-pointer hover:bg-black/80 transition">
              <Camera className="w-4 h-4 text-white" />

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setProfileImage(URL.createObjectURL(file));
                  }
                }}
              />
            </label>

          </div>

          {/* USER INFO */}
          <div className="flex-1 grid md:grid-cols-2 gap-6">

            {/* NAME */}
            <div>
              <p className="text-textMuted text-sm mb-1">Name</p>

              {editing ? (
                <input
                  className="bg-white/10 p-3 rounded-xl w-full outline-none border border-white/10"
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />
              ) : (
                <h2 className="text-2xl font-bold">{user.name}</h2>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <p className="text-textMuted text-sm mb-1">Email</p>

              {editing ? (
                <input
                  className="bg-white/10 p-3 rounded-xl w-full outline-none border border-white/10"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
              )}
            </div>

            {/* PHONE */}
            <div>
              <p className="text-textMuted text-sm mb-1">Phone</p>

              {editing ? (
                <input
                  className="bg-white/10 p-3 rounded-xl w-full outline-none border border-white/10"
                  value={user.phone}
                  onChange={(e) =>
                    setUser({ ...user, phone: e.target.value })
                  }
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </div>
              )}
            </div>

            {/* LOCATION */}
            <div>
              <p className="text-textMuted text-sm mb-1">Location</p>

              {editing ? (
                <input
                  className="bg-white/10 p-3 rounded-xl w-full outline-none border border-white/10"
                  value={user.location}
                  onChange={(e) =>
                    setUser({ ...user, location: e.target.value })
                  }
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
              )}
            </div>

            {/* COLLEGE */}
            <div>
              <p className="text-textMuted text-sm mb-1">College</p>

              {editing ? (
                <input
                  className="bg-white/10 p-3 rounded-xl w-full outline-none border border-white/10"
                  value={user.college}
                  onChange={(e) =>
                    setUser({ ...user, college: e.target.value })
                  }
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-300">
                  <School className="w-4 h-4" />
                  {user.college}
                </div>
              )}
            </div>

            {/* YEAR */}
            <div>
              <p className="text-textMuted text-sm mb-1">Academic Year</p>

              {editing ? (
                <input
                  className="bg-white/10 p-3 rounded-xl w-full outline-none border border-white/10"
                  value={user.year}
                  onChange={(e) =>
                    setUser({ ...user, year: e.target.value })
                  }
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-300">
                  <GraduationCap className="w-4 h-4" />
                  {user.year}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* BIO */}
        <div className="glass-panel mt-8 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-4">About Me</h2>

          {editing ? (
            <textarea
              className="bg-white/10 p-4 rounded-xl w-full min-h-120px outline-none border border-white/10"
              value={user.bio}
              onChange={(e) =>
                setUser({ ...user, bio: e.target.value })
              }
            />
          ) : (
            <p className="text-gray-300 leading-relaxed">
              {user.bio}
            </p>
          )}
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">

          <div className="glass-panel p-5 rounded-xl border border-white/10">
            <BarChart3 className="text-primary mb-2" />
            <p className="text-textMuted text-sm">Rank</p>
            <h3 className="text-xl font-bold">{user.rank}</h3>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/10">
            <GraduationCap className="text-primary mb-2" />
            <p className="text-textMuted text-sm">Branch</p>
            <h3 className="text-xl font-bold">{user.branch}</h3>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/10">
            <User className="text-primary mb-2" />
            <p className="text-textMuted text-sm">Category</p>
            <h3 className="text-xl font-bold">{user.category}</h3>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/10">
            <Award className="text-primary mb-2" />
            <p className="text-textMuted text-sm">AI Score</p>
            <h3 className="text-xl font-bold">92%</h3>
          </div>

        </div>

        {/* ACTIVITY */}
        <div className="mt-10 glass-panel p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-4">AI Activity</h2>

          <p className="text-textMuted leading-relaxed">
            You have run{' '}
            <span className="text-white font-bold">
              128 simulations
            </span>{' '}
            and saved{' '}
            <span className="text-white font-bold">
              24 colleges
            </span>.
          </p>
        </div>

      </div>
    </div>
  );
}