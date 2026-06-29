'use client';

import React, { useState } from 'react';
import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation';

export default function ProfileFreelancer({ userProfile, email }) {
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      skills: data.skills ? data.skills.split(',').map(s => s.trim()) : [],
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/users/profile/${email}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setIsSaving(false);
    if (response.ok) {
      setMsg("Profile updated successfully!");
      router.refresh();
      setTimeout(() => setMsg(""), 1000);
    }
  };

  return (
    <div className="max-w-2xl pb-10">
      
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Edit Profile</h1>
        <p className="text-gray-500 mt-1 font-medium">Update your public profile details.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        
        {msg && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 font-bold rounded-xl flex items-center gap-2">
            <Icon icon="lucide:check-circle-2" className="text-xl" /> {msg}
          </div>
        )}

        <Form className="flex flex-col gap-6 w-full" onSubmit={onSubmit}>
          
          <TextField isRequired name="name" defaultValue={userProfile?.name}>
            <Label className="font-bold text-gray-900">Name</Label>
            <Input placeholder="Jane Doe" className="bg-gray-50" />
          </TextField>

          <TextField name="image" type="url" defaultValue={userProfile?.image}>
            <Label className="font-bold text-gray-900">Profile Photo Link</Label>
            <Input placeholder="https://example.com/photo.jpg" className="bg-gray-50" />
          </TextField>

          <TextField name="skills" defaultValue={userProfile?.skills?.join(", ")}>
            <Label className="font-bold text-gray-900">Skills (Comma-separated)</Label>
            <Input placeholder="React, Figma, Node.js" className="bg-gray-50" />
          </TextField>

          <TextField name="hourlyRate" type="number" defaultValue={userProfile?.hourlyRate}>
            <Label className="font-bold text-gray-900">Hourly Rate (USD)</Label>
            <Input placeholder="25" className="bg-gray-50" />
          </TextField>

          <TextField name="bio" defaultValue={userProfile?.bio !== "none" ? userProfile?.bio : ""}>
            <Label className="font-bold text-gray-900">Bio</Label>
            <Input placeholder="Tell clients about yourself..." className="bg-gray-50" />
          </TextField>

          <Button 
            type="submit" 
            disabled={isSaving}
            className="w-full h-12 bg-gray-900 hover:bg-black text-white font-bold rounded-xl mt-2"
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </Button>

        </Form>
      </div>
    </div>
  );
}