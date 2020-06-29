package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"sort"
	"time"

	"github.com/chaiko2018/with-apollo-api/graph/generated"
	"github.com/chaiko2018/with-apollo-api/graph/model"
)

var posts []*model.Post = make([]*model.Post, 0)

func (r *mutationResolver) CreatePost(ctx context.Context, title string, url string) (*model.Post, error) {
	post := model.Post{
		ID:        fmt.Sprintf("%d", len(posts)+1),
		Title:     title,
		URL:       url,
		Votes:     0,
		CreatedAt: time.Now().Format("2006-01-02 15:04:05"),
	}

	posts = append(posts, &post)
	return &post, nil
}

func (r *mutationResolver) UpdatePost(ctx context.Context, id string, votes int) (*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) AllPosts(ctx context.Context, orderBy *model.OrderBy, first int, skip int) ([]*model.Post, error) {
	if skip > len(posts) {
		skip = len(posts)
	}
	if (skip + first) > len(posts) {
		first = len(posts) - skip
	}
	sortedPosts := make([]*model.Post, len(posts))
	copy(sortedPosts, posts)
	if orderBy != nil && *orderBy == "createdAt_DESC" {
		sort.SliceStable(sortedPosts, func(i, j int) bool {
			return sortedPosts[i].CreatedAt > sortedPosts[j].CreatedAt
		})
	}
	slicePosts := sortedPosts[skip : skip+first]
	return slicePosts, nil
}

func (r *queryResolver) AllPostsMeta(ctx context.Context) (*model.PostsMeta, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
