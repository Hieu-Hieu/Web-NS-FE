import React, { useEffect } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { useSelector } from "react-redux";
import { useValues } from "../../hooks";
import commentApi from "../../api/commentApi";
import { Spin, notification } from "antd";

const commentFormat = (item) => {
  return {
    userId: item?._id,
    comId: item?.id,
    text: item?.body,
    fullName: `${item?.author?.lastName} ${item?.author?.firstName}`,
    avatarUrl: item?.author?.avatar,
  };
};

const Comments = ({ productId }) => {
  const user = useSelector((state) => state?.userSignin?.userInfo);

  const [values, setValues] = useValues({
    loadingComments: false,
    comments: [],
  });

  const handleNewComment = (data) => {
    const { text, parentOfRepliedCommentId, repliedToCommentId } = data;

    const newData = {
      productId: productId,
      body: text,
      author: user?._id,
      date: new Date(),
      parentId: parentOfRepliedCommentId || repliedToCommentId,
    };

    setValues({ loadingComments: true });
    commentApi
      .createComment(newData)
      .then(({ status, comments }) => {
        if (status) {
          // fetchComments();
          // setValues({ comments: formatComments(comments) });
        }
      })
      .catch((data) => {
        notification.error({ message: "Bình luận thất bại, vui lòng thử lại" });
      })
      .finally(() => {
        // setValues({ loadingComments: false });
        fetchComments();
      });
  };

  const handleReplyComment = (data) => {
    const { text, commentId } = data;

    console.log("reply:::", data);

    const newData = {
      productId: productId,
      body: text,
      author: user?._id,
      date: new Date(),
    };

    setValues({ loadingComments: true });
    commentApi
      .createComment(newData)
      .then(({ status, comments }) => {
        if (status) {
          // fetchComments();
          // setValues({ comments: formatComments(comments) });
        }
      })
      .catch((data) => {
        notification.error({ message: "Bình luận thất bại, vui lòng thử lại" });
      })
      .finally(() => {
        // setValues({ loadingComments: false });
        fetchComments();
      });
  };

  const formatComments = (comments = []) => {
    return comments?.map((item) => {
      return {
        ...commentFormat(item),
        replies: item?.replies?.map((item) => commentFormat(item)),
      };
    });
  };

  const fetchComments = () => {
    setValues({ loadingComments: true });
    commentApi
      .getListComments({ productId })
      .then(({ status, comments }) => {
        if (status) {
          setValues({
            comments: formatComments(comments),
            loadingComments: false,
          });
          return;
        }
        setValues({
          loadingComments: false,
          comments: [],
        });
      })
      .catch(() => {
        setValues({
          loadingComments: false,
          comments: [],
        });
        notification.error({ message: "Đã xảy ra lỗi khi tải bình luận" });
      });
  };

  useEffect(() => {
    if (productId) {
      fetchComments();
    }
  }, [productId]);

  return (
    <Spin spinning={values.loadingComments}>
      <CommentSection
        advancedInput={true}
        currentUser={
          user?._id
            ? {
                currentUserId: user?._id,
                currentUserImg: user?.avatar,
                currentUserProfile: "/",
                currentUserFullName: user?.lastName + " " + user?.firstName,
              }
            : null
        }
        logIn={{
          loginLink: "/login",
          signupLink: "/register",
        }}
        commentData={values.comments}
        onSubmitAction={(data) => {
          handleNewComment(data);
        }}
        onReplyAction={(data) => {
          handleNewComment(data);
        }}
      />
    </Spin>
  );
};

export default Comments;
