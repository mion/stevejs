# N.B.:
# Just some random idea. It's very, very likely (~100%) 
# that someone thought of this before. Is there a bad reason
# assuming you don't have a designer on your team?
# Hmmm...

SML::Markup do
	top_menu 'div.nav.lg-col-4'	
	sidebar 'ul.nav.lg-col-3' do
		link 'a.item'
	end
end

<top_menu>
	<sidebar>
		<item></item>
	</sidebar>
</top_menu>

top_menu :menu
	sidebar :aside
		item :a, 'Home', "http://.." + icon :home
