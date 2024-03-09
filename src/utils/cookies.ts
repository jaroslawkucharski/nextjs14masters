"use server";

import { cookies } from "next/headers";

export const getCookie = async (key: string) => cookies().get(key)?.value;

export const setCookie = async (key: string, value: string) =>
	cookies().set(key, value, {
		httpOnly: true,
		sameSite: "strict",
		maxAge: 60 * 60 * 24 * 7,
	});

export const removeCookie = async (key: string) => cookies().delete(key);
