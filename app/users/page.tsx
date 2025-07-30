
'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UserModal from '../../components/UserModal';
import { RootState, AppDispatch } from '../../lib/store';
import { fetchUsers, deleteUserByAdmin } from '../../lib/slices/userSlice';

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { users, isLoading } = useSelector((state: RootState) => state.users);
  const { isLoading:currentUserLoading, user: currentUser } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if(currentUserLoading) return;
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    if (currentUser.role !== 'admin') {
      router.push('/profile');
      return;
    }

    dispatch(fetchUsers());
  }, [dispatch, currentUserLoading, currentUser, router]);

  const handleDeleteUser = async (userId: string) => {
    console.log(userId)
    if (confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUserByAdmin(userId));
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const filteredUsers = users?.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser || currentUser.role !== 'admin') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <button
                  onClick={handleAddUser}
                  className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition whitespace-nowrap cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-add-line"></i>
                    </div>
                    Add User
                  </div>
                </button>
              </div>
              
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-search-line text-gray-400"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-gray-500">Loading users...</div>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers?.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <div className="w-6 h-6 flex items-center justify-center">
                                <i className="ri-user-line text-purple-700"></i>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.company || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.phone || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-purple-600 hover:text-purple-900 cursor-pointer"
                            >
                              <div className="w-5 h-5 flex items-center justify-center">
                                <i className="ri-edit-line"></i>
                              </div>
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900 cursor-pointer"
                            >
                              <div className="w-5 h-5 flex items-center justify-center">
                                <i className="ri-delete-bin-line"></i>
                              </div>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              
              {!isLoading && filteredUsers?.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <i className="ri-user-line text-gray-400 text-2xl"></i>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                  <p className="text-gray-500">Try adjusting your search or add a new user.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {isModalOpen && (
        <UserModal
          user={editingUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
