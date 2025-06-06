"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heart, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import { IUser } from "@/database/user.model";
import CreateCommentForm from "./CommentForm";
import { usePathname } from "next/navigation";
import { likeUnlikePost } from "@/lib/actions/post.action";
import { LikeUsersShow } from "../shared/LikeUsersShow";

import { toast } from "react-toastify";
import EditDeletePost from "./EditDeletePost";
import { useState } from "react";

interface UserPostProps {
	author: Partial<IUser>;
	postId: string;
	postText: string;
	postedAt: string;
	postImg?: string;
	likes: string[];
	repliesCount: number;
	liked: boolean;
	isSelf: boolean;
}

const UserPost = ({
	author,
	postId,
	postText,
	postedAt,
	postImg,
	likes,
	repliesCount,
	liked,
	isSelf,
}: UserPostProps) => {
	const pathname = usePathname();
	const [fetched, setFetched] = useState(false);
	const [disabled, setDisabled] = useState(false);

	return (
		<div className="bg-background rounded-xl border border-border">
			<div className="flex px-2 py-4">
				<Link href={`/user/${author.username}`}>
					<Avatar className="w-16 h-16 mr-5">
						<AvatarImage src={author.picture} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</Link>
				<div className="w-full">
					<div className="flex mb-4 justify-between">
						<div className="space-y-1">
							<Link href={`/user/${author.username}`}>
								<span className="font-bold mr-2 cursor-pointer">
									{author.name}
								</span>

								<span className="text-muted-foreground text-sm cursor-pointer">
									@{author.username}
								</span>
							</Link>

							<Link
								href={`/user/${author.username}/post/${postId}`}
								className="block"
							>
								<div className="">{postText}</div>
							</Link>
						</div>
						<div className="flex mr-2 items-center h-fit">
							<span className="text-muted-foreground">
								{getTimestamp(postedAt) + " ago"}
							</span>
							{isSelf && (
								<EditDeletePost
									postId={postId}
									txt={postText}
									img={postImg || ""}
								/>
							)}
						</div>
					</div>

					{postImg && (
						<Link
							href={`/user/${author.username}/post/${postId}`}
							className="w-full mb-1"
						>
							<Image
								src={postImg}
								alt="post image"
								layout="responsive"
								width={16}
								height={9}
								objectFit="contain"
								className="rounded-xl max-h-[500px]"
							/>
						</Link>
					)}

					<div className="text-[14px] text-muted-foreground mb-2">
						<LikeUsersShow
							likedUsers={likes}
							fetched={fetched}
							setFetched={setFetched}
							disabled={disabled}
						>
							{likes.length}
						</LikeUsersShow>

						<span> &nbsp;|&nbsp; </span>
						<Link href={`/user/${author.username}/post/${postId}`}>
							<span className="cursor-pointer">{repliesCount} replies</span>
						</Link>
					</div>

					<div
						className="flex justify-between px-2"
						onClick={(e) => e.preventDefault()}
					>
						<Heart
							color={liked ? "red" : "currentColor"}
							fill={liked ? "red" : "transparent"}
							onClick={async () => {
								if (!isSelf) {
									setDisabled(true);
									await likeUnlikePost(postId, pathname);
									setTimeout(() => {
										setFetched(false);
										setDisabled(false);
									}, 1000);
								}
							}}
							className={`${
								isSelf || disabled
									? "cursor-not-allowed opacity-20"
									: "cursor-pointer"
							}`}
						/>
						<CreateCommentForm postId={postId} />
						<SquareArrowOutUpRight
							className="cursor-pointer"
							onClick={() => {
								navigator.clipboard.writeText(
									`https://social-media-app-gray-six.vercel.app/${author.username}/post/${postId}`
								);
								toast.success("Post Link copied!", { autoClose: 500 });
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserPost;

// Skeleton
// <div className="rounded-xl border border-border flex px-4 py-4">
// 	<div className="flex-shrink-0 mr-5">
// 		<Skeleton className="w-16 h-16 rounded-full" />
// 	</div>

// 	<div className="w-full vertical-flex space-y-2 mr-5">
// 		<div className="flex items-center">
// 			<Skeleton className="h-5 w-24 mr-2" />
// 			<Skeleton className="h-4 w-10" />
// 		</div>

// 		<Skeleton className="h-4 w-1/2" />

// 		<Skeleton className="w-full h-[300px] rounded-xl mb-1" />
// 	</div>
// </div>
