"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CircleUserRound, LogOut, Package, Settings } from "lucide-react";
import Image from "next/image";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserMenuType = {
	i18n: {
		orders: string;
		settings: string;
		logOut: string;
	};
};

export const UserMenu = ({ i18n }: UserMenuType) => {
	const { user } = useUser();
	const { signOut } = useClerk();
	const router = useRouter();

	const name = user?.fullName ?? "";
	const email = user?.emailAddresses[0]?.emailAddress ?? "";
	const image = user?.imageUrl;

	const handleSignOut = async () => {
		await signOut(() => router.push("/sign-in"));
	};

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button>
					{image ? (
						<Image
							className="rounded-full"
							src={user?.imageUrl ?? ""}
							alt={email}
							width={32}
							height={32}
						/>
					) : (
						<CircleUserRound className="h-[32px] w-[32px]" />
					)}
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<Menu.Item>
							<div className="flex items-center gap-2 px-4 py-2 text-sm">
								<Image
									className="rounded-full"
									src={user?.imageUrl ?? ""}
									alt={email}
									width={30}
									height={30}
								/>

								<div>
									<p className="font-semibold">{name}</p>
									<p className="text-[12px]">{email}</p>
								</div>
							</div>
						</Menu.Item>

						<Menu.Item>
							<Link
								href="/orders"
								className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
							>
								<Package className="h-4 w-4 text-gray-600" />

								{i18n.orders}
							</Link>
						</Menu.Item>

						<Menu.Item>
							<Link
								href="/profile"
								className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
							>
								<Settings className="h-4 w-4 text-gray-600" />

								{i18n.settings}
							</Link>
						</Menu.Item>
					</div>

					<div className=" py-1">
						<Menu.Item>
							<button
								onClick={handleSignOut}
								className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
							>
								<LogOut className="h-4 w-4 text-gray-600" />

								{i18n.logOut}
							</button>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
