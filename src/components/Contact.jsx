import React from "react";

const Contact = () => {
  return (
    <div className="p-9 flex h-screen flex-col gap-5 justify-center items-center text-black rounded-lg shadow-lg">
      <div className="w-full shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-md p-5 hover:backdrop-blur-sm transition ease-in duration-300 flex flex-col gap-4 items-center max-w-6xl sm:max-w-6xl md:max-w-4xl lg:max-w-3xl xl:max-w-2xl">
        <h1 className="text-xl font-bold text-black sm:text-2xl md:text-3xl ">
          Contact Us
        </h1>
        <p className="mt-4">
          If you have any questions or need assistance, feel free to reach out
          to us.
        </p>
        <form className="mt-2 w-full max-w-md">
          <div className="mb-4">
            <label
              className="block"
              htmlFor="name">
              Name:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block"
              htmlFor="email">
              Email:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block"
              htmlFor="message">
              Message:
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              id="message"
              name="message"
              rows="4"
              required></textarea>
          </div>

          <button
            type="submit"
            className="bg-black border-1 w-full border-black hover:text-black hover:bg-gray-200 text-white p-2 rounded transition ease-in duration-300 cursor-pointer">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
