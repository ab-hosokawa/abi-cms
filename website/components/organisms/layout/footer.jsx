'use client';
import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-700 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} MVP SITE.
                </p>
            </div>
        </footer>
    );
}
