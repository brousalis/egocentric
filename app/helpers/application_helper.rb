module ApplicationHelper

  def format_date(datetime)
    return datetime.strftime("%m/%d/%Y")
  end

  def truncate(string, length = 10)
    string.size > length ? string[0,length] + "&hellip;" : string
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
    ["capping", "offense", "defense", "midfield", "beginner"]
  end

  def maps
    ["raindance", "katabatic", "sunstar", "arx novena", "crossfire", "temple", "drydock"]
  end

  def bar_width(user)
    guides = Guide.all.count
    return (user.to_f / guides.to_f * 100).round(2)
  end

end
