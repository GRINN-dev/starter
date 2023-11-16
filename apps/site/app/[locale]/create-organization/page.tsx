"use client";

import React, { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { debounce } from "lodash";

// Import other necessary dependencies as needed

const CreateOrganizationPage = () => {
  const [formError, setFormError] = useState(null);
  const form = useForm();
  const [slug, setSlug] = useState("");
  const [slugCheckIsValid, setSlugCheckIsValid] = useState(false);

  const checkSlug = useMemo(
    () =>
      debounce(async (slug) => {
        try {
          if (slug) {
            // Replace this with your own organization lookup logic
          }
        } catch (e) {
          /* NOOP */
        } finally {
          setSlugCheckIsValid(true);
        }
      }, 500),
    []
  );

  useEffect(() => {
    setSlugCheckIsValid(false);
    checkSlug(slug);
  }, [checkSlug, slug]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Create Organization</h1>
      <div className="bg-white p-6 rounded shadow">
        <form onSubmit={form.handleSubmit((data) => console.log(data))}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border rounded p-2"
            />
          </div>
          <p className="mb-4">
            Your organization URL will be{" "}
            <span className="font-bold">{`${process.env.ROOT_URL}/o/${slug}`}</span>
          </p>
          {
            !slug ? null : !slugCheckIsValid ? (
              <div>Loading...</div>
            ) : null /* Your existing organization check logic here */
          }
          {formError ? (
            <div className="text-red-500 mb-4">
              <p className="font-semibold">Creating organization failed</p>
              {/* Your existing error message logic here */}
            </div>
          ) : null}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganizationPage;
