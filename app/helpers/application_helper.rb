module ApplicationHelper
  def format_date(datetime)
    return datetime.strftime("%m/%d/%Y")
  end

  def truncate(string, length = 10)
    string.size > length ? string[0,length] + "..." : string
  end 

  def render_markdown(text)
    md = RDiscount.new(text)
    md.to_html
  end

  def user_avatar(user = current_user)
    user.avatar == "default" ? "/assets/default.png" : user.avatar
  end
  
  def comment_sort(comments)
    if params[:filter] == "likes"
      comments.sort_by{|c| c.likes.count}.reverse
    else
      comments.sort_by{|c| c.created_at}.reverse
    end
  end

  def guide_categories
    ["capping", "offense", "defense", "midfield", "maps", "beginner"]
  end

end
