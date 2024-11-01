import React from "react";
import "./SuperheroCreation.css";
import { useState } from "react";
import { createHero } from "../../api/api";
import { useNavigate } from "react-router-dom";

function SuperheroCreation() {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        nickname: "",
        realName: "",
        originDescription: "",
        superpowers: "",
        catchPhrase: "",
        images: [],
    });

    const handleImageChange = (e) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            images: [...e.target.files],
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (const key in formValues) {
            if (key === "images") {
                formValues.images.forEach((image) => {
                    formData.append("images", image);
                });
            } else {
                formData.append(key, formValues[key]);
            }
        }

        try {
            await createHero(formData);
        } catch (error) {
            console.error("Error creating superhero:", error);
        }
        navigate("/");
    };

    return (
        <div className="creation__page">
            <div className="creation__form">
                <h1>Superhero Creation</h1>
                <form>
                    <div className="input__block">
                        <div className="input__field">
                            <input
                                onChange={handleInputChange}
                                name="nickname"
                                type="text"
                                placeholder="Nickname"
                                required
                            ></input>
                        </div>
                        <div className="input__field">
                            <input
                                onChange={handleInputChange}
                                name="realName"
                                type="text"
                                placeholder="Real name"
                            ></input>
                        </div>
                        <div>
                            <textarea
                                onChange={handleInputChange}
                                name="superpowers"
                                placeholder="Superpowers"
                            />
                        </div>
                        <div className="input__field">
                            <input
                                onChange={handleInputChange}
                                name="catchPhrase"
                                type="text"
                                placeholder="Catch phrase"
                            ></input>
                        </div>
                        <div>
                            <textarea
                                onChange={handleInputChange}
                                name="originDescription"
                                placeholder="Origin description"
                            />
                        </div>
                        <div>
                            <label>Images:</label>
                            <input
                                type="file"
                                name="images"
                                onChange={handleImageChange}
                                accept="image/*"
                                multiple
                            />
                        </div>
                    </div>
                </form>
                <button onClick={handleSubmit} className="input__btn">
                    Create
                </button>
            </div>
        </div>
    );
}

export default SuperheroCreation;
