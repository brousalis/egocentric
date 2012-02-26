desc "push to heroku"
task :p => :environment do
  puts '* Pushing to Github and Heroku'
  puts `git add .`
  puts `git commit -m "#{ENV['m']}" .`
  puts `git push origin master`
  puts `git push heroku master`
end

