import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileFromToken } from '../../redux/authSlice';
import { getUserProfileToken } from '../../api/authApi';
import type { RootState, AppDispatch } from '../../redux/store';
import AdminNavbar from '../../Components/user/AdminNavbar'; // Importez le composant de navigation

export default function UserPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      dispatch(fetchUserProfileFromToken());
      
      getUserProfileToken(token)
        .then(user => dispatch(setUser(user)))
        .catch(err => console.error("Erreur auth persistante :", err));

      navigate('/user', { replace: true });
    } else {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        navigate('/login?error=unauthorized');
      } else {
        dispatch(fetchUserProfileFromToken());
      }
    }
  }, [location.search, dispatch, navigate]);

  // Protection si non connecté
  if (!user) {
    return (
      <div className="pt-24 text-center text-red-600 text-xl font-semibold">
        Veuillez vous connecter pour accéder à votre espace utilisateur.
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="pt-24 px-4">
        {/* Contenu spécifique à la page utilisateur */}
      </div>
    </>
  );
}