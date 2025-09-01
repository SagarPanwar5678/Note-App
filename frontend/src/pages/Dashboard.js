import SignupForm from "../components/SignupForm";
// import Notes from "../components/Notes";

export default function Dashboard({ user, setUser }) {
  return (
    <div>
      {!user ? (
        <SignupForm setUser={setUser} />
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
        </div>
      )}
    </div>
  );
}
