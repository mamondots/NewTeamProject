import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import catImage from "../../assets/cat-quiz.png";
import dogImage from "../../assets/dog-quiz.png";
import { MdDone } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";

const Quiz = () => {
  const { user, loading } = useContext(AuthContext);

  const initialAnswers = {
    petPreference: "",
    catAgePreference: "",
    dogAgePreference: "",
    genderPreference: "",
    willingToTrain: "",
    adoptLocal: "",
  };

  const [progressLoading, setProgressLoading] = useState(false);
  const [answers, setAnswers] = useState(initialAnswers);

  const handleAnswer = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
  };

  const saveAnswersToDB = () => {
    setProgressLoading(true);

    const userPreference = { ...answers };
    userPreference.email = user.email;

    axios
      .post("https://litl-pal-server-margubtech-gmailcom.vercel.app/api/user-preference", userPreference)
      .then((data) => {
        console.log(data.data);
        Swal.fire("Good job!", "Your preferences have been saved", "success");
        setProgressLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get("https://litl-pal-server-margubtech-gmailcom.vercel.app/api/user-preference/" + user?.email)
      .then((data) => {
        if (data.data) {
          setAnswers(data.data);
        }
      });
  }, [user]);

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <div className="my-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h1 className="mt-2 mb-2 text-[24px] text-[#292A35] font-semibold text-center">
            Pet Preference and Adoption Quiz
          </h1>

          {answers.petPreference === "" && (
            <div className="border p-5 max-w-[600px] mx-auto rounded-md shadow-2xl">
              <p className="text-xl md:text-3xl text-[#4B5563] font-semibold text-center mb-5">
                Are you a cat lover or a dog lover?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-2 mt-2">
                <button
                  className="quiz-button flex flex-row md:flex-col items-center justify-center gap-3 basis-1/3"
                  onClick={() => handleAnswer("petPreference", "Cat")}
                >
                  <img
                    src={catImage}
                    alt="cat-image"
                    className="h-10 md:h-28"
                  />
                  <span>Cat</span>
                </button>
                <button
                  className="quiz-button flex flex-row md:flex-col items-center justify-center gap-3 basis-1/3"
                  onClick={() => handleAnswer("petPreference", "Dog")}
                >
                  <img
                    src={dogImage}
                    alt="cat-image"
                    className="h-10 md:h-28"
                  />
                  <span>Dog</span>
                </button>
                <button
                  className="quiz-button h-14 md:h-auto"
                  onClick={() => handleAnswer("petPreference", "Both")}
                >
                  Both
                </button>
              </div>
            </div>
          )}

          {(answers.petPreference === "Cat" ||
            answers.petPreference === "Both") &&
            answers.catAgePreference == "" && (
              <div className=" border p-5 max-w-[600px] mx-auto rounded-md shadow-2xl">
                <p className="text-xl md:text-3xl text-[#4B5563] font-semibold text-center mb-5">
                  Would you rather prefer a kitten or an adult cat?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-2 mt-2">
                  <button
                    className="quiz-button"
                    onClick={() => handleAnswer("catAgePreference", "Kitten")}
                  >
                    Kitten
                  </button>
                  <button
                    className="quiz-button"
                    onClick={() =>
                      handleAnswer("catAgePreference", "Adult Cat")
                    }
                  >
                    Adult Cat
                  </button>
                  <button
                    className="quiz-button"
                    onClick={() => handleAnswer("catAgePreference", "Both")}
                  >
                    Both
                  </button>
                </div>
              </div>
            )}

          {((answers.petPreference === "Both" &&
            answers.catAgePreference !== "") ||
            (answers.petPreference === "Dog" &&
              answers.dogAgePreference === "")) &&
            answers.dogAgePreference === "" && (
              <div className="border p-5 max-w-[600px] mx-auto rounded-md shadow-2xl">
                <p className="text-xl md:text-3xl text-[#4B5563] font-semibold text-center mb-5">
                  Would you rather prefer a puppy or an adult dog?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-2 mt-2">
                  <button
                    className="quiz-button"
                    onClick={() => handleAnswer("dogAgePreference", "Puppy")}
                  >
                    Puppy
                  </button>
                  <button
                    className="quiz-button"
                    onClick={() =>
                      handleAnswer("dogAgePreference", "Adult Dog")
                    }
                  >
                    Adult Dog
                  </button>
                  <button
                    className="quiz-button"
                    onClick={() => handleAnswer("dogAgePreference", "Both")}
                  >
                    Both
                  </button>
                </div>
              </div>
            )}

          {((answers.petPreference === "Cat" &&
            answers.catAgePreference !== "") ||
            (answers.petPreference === "Dog" &&
              answers.dogAgePreference !== "") ||
            (answers.petPreference == "Both" &&
              answers.catAgePreference !== "" &&
              answers.dogAgePreference !== "")) &&
            answers.genderPreference === "" && (
              <div className="border p-5 max-w-[600px] mx-auto rounded-md shadow-2xl">
                <p className="text-xl md:text-3xl text-[#4B5563] font-semibold text-center mb-5">
                  Which gender of pet do you think would be a better fit for
                  you?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-2 mt-2">
                  <button
                    className="quiz-button"
                    onClick={() => handleAnswer("genderPreference", "Male")}
                  >
                    Male
                  </button>
                  <button
                    className="quiz-button"
                    onClick={() => handleAnswer("genderPreference", "Female")}
                  >
                    Female
                  </button>
                  <button
                    className="quiz-button"
                    onClick={() => handleAnswer("genderPreference", "Any")}
                  >
                    Any
                  </button>
                </div>
              </div>
            )}

          {answers.genderPreference !== "" && answers.willingToTrain === "" && (
            <div className="border p-5 max-w-[600px] mx-auto rounded-md shadow-2xl">
              <p className="text-xl md:text-3xl text-[#4B5563] font-semibold text-center mb-5">
                Are you willing to train your new pet?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-2 mt-2">
                <button
                  className="quiz-button"
                  onClick={() => {
                    handleAnswer("willingToTrain", "Yes");
                  }}
                >
                  Yes
                </button>
                <button
                  className="quiz-button"
                  onClick={() => {
                    handleAnswer("willingToTrain", "No");
                  }}
                >
                  No
                </button>
              </div>
            </div>
          )}

          {answers.willingToTrain !== "" && answers.adoptLocal === "" && (
            <div className="border p-5 max-w-[600px] mx-auto rounded-md shadow-2xl">
              <p className="text-xl md:text-3xl text-[#4B5563] font-semibold text-center mb-5">
                Do you prefer to adopt pets from your city only?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-2 mt-2">
                <button
                  className="quiz-button"
                  onClick={() => {
                    handleAnswer("adoptLocal", "Yes");
                  }}
                >
                  Yes
                </button>
                <button
                  className="quiz-button"
                  onClick={() => {
                    handleAnswer("adoptLocal", "No");
                  }}
                >
                  No
                </button>
              </div>
            </div>
          )}

          {answers.adoptLocal !== "" && (
            <div className="border p-5 max-w-[600px] mx-auto rounded-md shadow-2xl space-y-5">
              {progressLoading && (
                <h1 className="bg-amber-500 text-white">Loading...</h1>
              )}
              <h2 className="text-xl md:text-3xl text-[#FC7676] font-semibold text-center mb-5">
                Your pet preferences
              </h2>
              <div className="text-center text-xl">
                <p>
                  Cat or Dog: <b>{answers.petPreference}</b>
                </p>
                <p>
                  Cat Age Preference: <b>{answers.catAgePreference}</b>
                </p>
                <p>
                  Dog Age Preference: <b>{answers.dogAgePreference}</b>
                </p>
                <p>
                  Gender Preference: <b>{answers.genderPreference}</b>
                </p>
                <p>
                  Willing to Train: <b>{answers.willingToTrain}</b>
                </p>
                <p>
                  Adopt Local: <b>{answers.adoptLocal}</b>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => saveAnswersToDB()}
                  className="px-4 py-2 text-[15px] text-white hover:bg-[#434760] bg-green-500 transition-all duration-500 rounded-2xl flex justify-center items-center gap-2"
                >
                  {progressLoading ? (
                    <span className="loading loading-spinner text-white"></span>
                  ) : (
                    <>
                      <MdDone /> <span>Save</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setAnswers(initialAnswers);
                  }}
                  className="quiz-button flex justify-center items-center gap-2"
                >
                  <BiSolidEditAlt /> <span>Change</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
