module ApplicationHelper
  def format_date(datetime)
    return datetime.strftime("%d/%m/%Y")
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
end
